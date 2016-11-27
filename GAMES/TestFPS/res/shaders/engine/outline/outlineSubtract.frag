#version 150

uniform sampler2D sampler_diffuse1; // Original
uniform sampler2D sampler_diffuse2; // Blurred

in vec2 vTexCoords;
in vec4 vColor;

out vec4 out_Color;

void main() {
	vec4 textureSample1 = texture(sampler_diffuse1, vTexCoords);
	vec4 textureSample2 = texture(sampler_diffuse2, vTexCoords);
	vec4 originalColor = vec4( textureSample1.r );
	vec4 outlineColor  = vec4( textureSample2.r );
	float boost = 2.3;
	

	// Calculate outline
	out_Color = outlineColor-originalColor;
	
	// Boost outline
	out_Color *= boost;
	
	// Clamp outline
	out_Color = min( vec4( 1.0 ), out_Color );
	
	// Change it to desired color
	out_Color *= vColor;
}