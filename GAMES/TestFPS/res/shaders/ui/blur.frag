#version 150

#define SAMPLES 5

uniform sampler2D texture;

uniform vec2 offset;

in vec2 texCoords;

out vec4 fragColor;

float weights[5] = float[5](
	70.0, 56.0, 28.0, 8.0, 1.0
);

const float multiplier = 1.0 / (70.0 + 56.0*2.0 + 28.0*2.0 + 8.0*2.0 + 1.0*2.0);

void main(){
	
	vec4 color = texture(texture, texCoords) * weights[0];

	for(int i = 1; i < SAMPLES; i++){
		vec2 sampleCoords = offset * float(i);
		
		color += texture(texture, texCoords + sampleCoords) * weights[i];
		color += texture(texture, texCoords - sampleCoords) * weights[i];
	}
	fragColor = color * multiplier;
}