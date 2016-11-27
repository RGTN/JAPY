#version 150

uniform sampler2D color;

uniform float exposure;

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
	
	vec3 c = toneMap(texture(color, texCoords).rgb * exposure);
	
	vec3 whiteScale = 1.0/toneMap(vec3(W));
	c = pow(c*whiteScale, vec3(gamma));
	
	float lum = luma(c);
	
	fragColor = vec4(mix(vec3(lum), c, saturation), lum);
}