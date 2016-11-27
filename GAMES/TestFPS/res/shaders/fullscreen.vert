#version 150

in vec2 position;

out vec2 texCoords;

void main(){
	gl_Position = vec4(position, 1, 1);
	texCoords = position * 0.5 + 0.5;
}