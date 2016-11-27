#version 330

uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;

uniform mat4 worldMatrix;
uniform mat3 normalWorldMatrix;
uniform vec4 modelColor;
uniform vec4 pipelineColor;

uniform mat4 boneMat[64];

layout (location = 0) in vec3 in_Position;
layout (location = 1) in vec3 in_Normal;
layout (location = 2) in vec2 in_TexCoords;
layout (location = 3) in vec4 in_Color;
layout (location = 4) in vec4 blendIndices;
layout (location = 5) in vec4 blendWeights;

out vec3 vNormal;
out vec3 vViewSpacePos;
out vec2 vTexCoords;
out vec4 vColor;

void main(){
	vec4 newVertex = vec4(0.0);
	vec4 newNormal = vec4(0.0);
	int index = 0;

	index = int(blendIndices.x);
	newVertex += boneMat[index] * vec4(in_Position, 1.0) * blendWeights.x;
	newNormal += boneMat[index] * vec4(in_Normal, 0.0) * blendWeights.x;

	index = int(blendIndices.y);
	newVertex += boneMat[index] * vec4(in_Position, 1.0) * blendWeights.y;
	newNormal += boneMat[index] * vec4(in_Normal, 0.0) * blendWeights.y;

	index = int(blendIndices.z);
	newVertex += boneMat[index] * vec4(in_Position, 1.0) * blendWeights.z;
	newNormal += boneMat[index] * vec4(in_Normal, 0.0) * blendWeights.z;

	index = int(blendIndices.w);
	newVertex += boneMat[index] * vec4(in_Position, 1.0) * blendWeights.w;
	newNormal += boneMat[index] * vec4(in_Normal, 0.0) * blendWeights.w;

	// Calculate viewspace position
	vec4 viewPos = viewMatrix * worldMatrix * vec4(newVertex.xyz, 1.0);
	
	// Project geometry
	gl_Position = projectionMatrix * viewPos;
	
	// Vertex outputs
	vViewSpacePos = viewPos.xyz;
	vNormal = normalMatrix * normalWorldMatrix * newNormal.xyz;
	vTexCoords = in_TexCoords;
	vColor = in_Color * modelColor * pipelineColor;
}