#version 150

uniform sampler2D depthBuffer;
uniform sampler2D decalTexture;

uniform mat4 inverseViewProjectionMatrix;

uniform vec2 inverseScreenSize;

flat in mat4 vDecalMatrix;
flat in mat4 vInverseDecalMatrix;
flat in vec4 vColor;

out vec4 gBuffer0;

void main(){

	vec2 texCoords = gl_FragCoord.xy * inverseScreenSize;
	vec4 clipPos = vec4(vec3(texCoords, texture(depthBuffer, texCoords).r) * 2.0 - 1.0, 1.0);
	vec4 decalSpace = vInverseDecalMatrix * (inverseViewProjectionMatrix * clipPos);
	decalSpace.xyz /= decalSpace.w;

	vec3 decalTexCoords = decalSpace.xyz*0.5 + 0.5;
	if(decalTexCoords != clamp(decalTexCoords, 0.0, 1.0)){
		discard;
		return;
	}

	float fade = 1.0 - abs( decalSpace.z );
	fade = clamp( fade, 0.0, 1.0 );
	vec4 decalColor = vec4( vColor.x, vColor.y, vColor.z, fade );
	gBuffer0 = texture(decalTexture, decalTexCoords.xy) * decalColor;
}