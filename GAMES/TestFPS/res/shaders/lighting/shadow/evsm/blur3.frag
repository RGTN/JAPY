#version 330

uniform sampler2D sampler;
uniform vec2 offset;

in vec2 texCoords;

out vec4 moments;

void main(){
    moments = texture(sampler, texCoords - offset*0.5)*0.5 + texture(sampler, texCoords + offset*0.5)*0.5;;
}