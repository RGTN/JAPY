#version 150

uniform sampler2D color;
uniform sampler2D bloom;

uniform float exposure;

uniform float bloomLevels;
uniform float bloomIntensity;

uniform float gamma;
uniform float saturation;


float A = 0.15;
float B = 0.50;
float C = 0.10;
float D = 0.20;
float E = 0.02;
float F = 0.30;
float W = 11.2;

in vec2 texCoords;

out vec4 fragColor;

vec3 toneMap(vec3 x)
{
   return ((x*(A*x+C*B)+D*E)/(x*(A*x+B)+D*F)) - E/F;
}

float luma(vec3 color){
	return dot(color, vec3(0.299, 0.587, 0.114));
}

void main(){
	
	vec3 colorData = texture(color, texCoords).rgb;
	
	vec3 bloomData = vec3(0, 0, 0);
	/*for(float i = 0; i < bloomLevels; i++){
		bloomData += textureLod(bloom, texCoords, i).rgb;
	}*/
	
	
	float samples = floor(bloomLevels * 0.5);
	for(float i = 0; i < samples; i++){
		//Read two mipmaps at a time using trilinear filtering
		bloomData += textureLod(bloom, texCoords, i*2 + 0.5).rgb * 2.0;
	}
	if(samples*2 < bloomLevels){
		bloomData += textureLod(bloom, texCoords, bloomLevels-1).rgb;
	}
	
	vec3 c = toneMap(colorData * exposure + bloomData * bloomIntensity);
	
	vec3 whiteScale = 1.0/toneMap(vec3(W));
	c = pow(c*whiteScale, vec3(gamma));
	
	float lum = luma(c);
	
	fragColor = vec4(mix(vec3(lum), c, saturation), lum);
}