#version 330

uniform mat4 viewProjectionMatrix;
uniform mat4 worldMatrix;

layout (location = 0) in vec3 in_Position;
layout (location = 2) in vec2 in_TexCoords;

out vec2 vTexCoords;

void main(){
	gl_Position = viewProjectionMatrix * worldMatrix * vec4(in_Position, 1.0);
	vTexCoords = in_TexCoords;
}