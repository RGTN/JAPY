#version 330

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

uniform mat4 worldMatrix;
uniform mat3 normalWorldMatrix;
uniform vec4 modelColor;
uniform vec4 pipelineColor;

layout (location = 0) in vec3 in_Position;
layout (location = 1) in vec3 in_Normal;
layout (location = 2) in vec2 in_TexCoords;
layout (location = 3) in vec4 in_Color;


out vec3 vNormal;
out vec3 vViewSpacePos;
out vec2 vTexCoords;
out vec4 vColor;

void main(){
	vec4 viewPos = viewMatrix * worldMatrix * vec4(in_Position, 1.0);
	gl_Position = projectionMatrix * viewPos;
	vViewSpacePos = viewPos.xyz;
	
	vNormal = normalMatrix * normalWorldMatrix * in_Normal;
	vTexCoords = in_TexCoords;
	vColor = in_Color * modelColor * pipelineColor;
}