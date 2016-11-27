#version 150

uniform sampler2D sampler;
uniform vec2 offset;

in vec2 texCoords;

out vec3 fragColor;

void main(){
    
    vec3 color = texture(sampler, clamp(texCoords - offset, 0.0, 1.0)).rgb * (5.0 / 16.0);
    color += texture(sampler, texCoords).rgb * (6.0 / 16.0);
    color += texture(sampler, clamp(texCoords + offset, 0.0, 1.0)).rgb * (5.0 / 16.0);
    fragColor = color;
}