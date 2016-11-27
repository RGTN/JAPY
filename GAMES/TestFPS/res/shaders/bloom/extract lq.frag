#version 150

uniform sampler2D color;

uniform vec2 offset;

uniform float exposure;
uniform float threshold;

in vec2 texCoords;

out vec3 fragColor;

vec3 sample(vec2 tc){
	return max(vec3(0.0), texture(color, tc).rgb * exposure - threshold);
}

void main(){
	vec2 offset2 = offset * vec2(1, -1);
    fragColor = 0.25 * (sample(texCoords - offset) + sample(texCoords + offset) + sample(texCoords - offset) + sample(texCoords + offset2));
}