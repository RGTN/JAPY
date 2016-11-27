#version 330

uniform mat4 viewProjectionMatrix;
uniform mat4 worldMatrix;

layout (location = 0) in vec3 in_Position;

void main(){
	gl_Position = viewProjectionMatrix * worldMatrix * vec4(in_Position, 1.0);
}