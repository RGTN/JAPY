#version 150

uniform vec2 inverseResolution;

layout(points) in;
layout(triangle_strip, max_vertices = 4) out;

in vec3[1] vPosSize;
in vec2[1] vNearFar;

out vec2 texCoords;
out vec2 nearFar;


void main(){

	nearFar = vNearFar[0];
	
	vec2 corner0 = vPosSize[0].xy;
	vec2 corner1 = corner0 + vPosSize[0].z;
	
	vec2 pos0 = corner0 * inverseResolution * 2 - 1;
	vec2 pos1 = corner1 * inverseResolution * 2 - 1;
	
	gl_Position = vec4(pos0.x, pos0.y, 0, 1);
	texCoords = corner0;
	EmitVertex();
	
	gl_Position = vec4(pos0.x, pos1.y, 0, 1);
	texCoords = vec2(corner0.x, corner1.y);
	EmitVertex();
	
	gl_Position = vec4(pos1.x, pos0.y, 0, 1);
	texCoords = vec2(corner1.x, corner0.y);
	EmitVertex();
	
	gl_Position = vec4(pos1.x, pos1.y, 0, 1);
	texCoords = corner1;
	EmitVertex();
	
	EndPrimitive();
	
}