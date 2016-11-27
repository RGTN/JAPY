#version 150

uniform sampler2D sampler_diffuse;

in vec2 vTexCoords;
in vec4 vColor;

out vec4 out_Color;

void main(){
	vec4 sample = texture(sampler_diffuse, vTexCoords);
	if (sample.a <= 0.01)
		discard;
		
	out_Color = (sample * vColor);
}