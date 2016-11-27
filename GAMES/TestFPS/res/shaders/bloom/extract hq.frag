#version 150

uniform sampler2D color;

uniform float exposure;
uniform float threshold;

in vec2 texCoords;

out vec3 fragColor;

void main(){
    fragColor = max(vec3(0.0), texture(color, texCoords).rgb * exposure - threshold);
}