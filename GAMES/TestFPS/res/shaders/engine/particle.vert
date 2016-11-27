#version 330

uniform sampler2D diffuseMap;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

layout (location = 0) in vec3 in_Position;
layout (location = 1) in vec4 xyzs;
layout (location = 2) in vec4 color;

out vec2 vTexCoords;
out vec4 vColor;

void main(){
	vec3 particlePos = xyzs.xyz;
	float particleSize = xyzs.w;
	
	vec3 cameraRight = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);
	vec3 cameraUp    = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);
		
	vec3 particleVertex = particlePos
							+ (cameraRight * in_Position.x * particleSize)
							+ (cameraUp    * in_Position.y * particleSize);
	
	gl_Position = projectionMatrix * viewMatrix * vec4(particleVertex, 1.0f);
	
	vTexCoords = in_Position.xy + vec2(0.5, 0.5);
	vColor = color;
}