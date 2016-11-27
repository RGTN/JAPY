#version 150

in vec3 posSize;
in vec2 nearFar;

out vec3 vPosSize;
out vec2 vNearFar;

void main(){
	vPosSize = posSize;
	vNearFar = nearFar;
}