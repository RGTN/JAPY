#version 330

uniform sampler2D sampler;
uniform vec2 offset;

in vec2 texCoords;

out vec4 moments;

void main(){
    vec4 color = texture(sampler, texCoords) * 0.2270270270;
    
    vec2 os;
    
    os = 1.3846153846 * offset;
    color += (texture(sampler, texCoords - os) + texture(sampler, texCoords + os)) * 0.3162162162;
    
    os = 3.2307692308 * offset;
    color += (texture(sampler, texCoords - os) + texture(sampler, texCoords + os)) * 0.0702702703;
    
    moments = color;
	
}