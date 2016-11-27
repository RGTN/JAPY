#version 150

uniform sampler2D sampler_diffuse;

in vec2 vTexCoords;

out float out_Color;

void main(){
	float alph = texture( sampler_diffuse, vTexCoords ).a;
	if( alph < 0.5 ) {
		discard;
	}
	
	out_Color = 1.0;
}