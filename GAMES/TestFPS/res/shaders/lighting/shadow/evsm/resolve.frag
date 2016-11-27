#version 150

#define SAMPLES 8

#define INV_SAMPLES (1.0/SAMPLES)

uniform sampler2DMS sampler;

in vec2 texCoords;
in vec2 nearFar;

out vec4 moments;



const float c = 40; //Hardcoded value since depth is normalized to [0.0 - 1.0]


float linearize(float depth){
	//return 2 / (nearFar.x - depth * nearFar.y);
	
	float n = nearFar.x;
	float f = nearFar.y;
	return (2 * n) / (f + n - depth * (f - n)) * 2 - 1;
}

void main(){
	
	ivec2 tc = ivec2(texCoords.x, texCoords.y);
	
	moments = vec4(0, 0, 0, 0);
	
	for(int i = 0; i < SAMPLES; i++){
		float d = linearize(texelFetch(sampler, tc, i).r);
		
		float m1 = exp(c*d);
		float m2 = -exp(-c*d);
		
		moments += vec4(m1, m1*m1, m2, m2*m2) * INV_SAMPLES; //Do divide here to lower risk of overflowing. Free anyway thanks to MAD.
	}
	
	//moments = vec4(texelFetch(sampler, tc, 0).r);
	//moments = vec4(texelFetch(sampler, ivec2(0), 0).r);
	//moments = vec4(0.98);
}