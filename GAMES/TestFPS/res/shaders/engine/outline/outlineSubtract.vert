#version 330

uniform mat4 projectionMatrix;
uniform mat4 worldMatrix;
uniform vec4 pipelineColor;

layout (location = 0) in vec3 in_Position;
layout (location = 2) in vec2 in_TexCoords;

out vec2 vTexCoords;
out vec4 vColor;

void main(){
	gl_Position = projectionMatrix * worldMatrix * vec4(in_Position, 1.0);
	vTexCoords = in_TexCoords;
	vColor = pipelineColor;
}