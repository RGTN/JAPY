#version 150

uniform sampler2D depthBuffer;

uniform vec3 nearFar; //This should be filled with vec3(far * near, far, far-near)

in vec2 texCoords;

out float linearDepth;

void main(){
	float depthValue = texture(depthBuffer, texCoords).r;
	
	/*
	float n = nearFar.x;
	float f  = nearFar.y;
	float l = (2.0 * n) / (f + n - depthValue * (f - n));
	*/
	
	float l = nearFar.x / (nearFar.y - depthValue * nearFar.z);
	linearDepth = l / nearFar.y;
}