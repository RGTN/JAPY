#version 150

uniform mat4 viewProjectionMatrix;

//Per vertex
in vec3 position;

//Per instance
in mat4 decalMatrix;
in mat4 inverseDecalMatrix;
in vec4 color;

flat out mat4 vInverseDecalMatrix;
flat out vec4 vColor;

void main(){
	gl_Position = viewProjectionMatrix * (decalMatrix * vec4(position, 1.0));
	vInverseDecalMatrix = inverseDecalMatrix;
	vColor = color;
}