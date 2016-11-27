#version 150

uniform samplerCube lookupMap;

uniform float lightIntensity;

uniform mat4 inverseViewMatrix;
uniform vec3 lightWorldPosition;

uniform vec2 shadowOffset;
uniform vec2 shadowResolution;
uniform float margin;
uniform float near;



float shadow(vec2 coords, float depth);

float shadowPoint(vec3 eyeSpace){
	eyeSpace *= 0.9999; //Depth bias to handle to g-buffer imprecision
	vec3 worldCoordinates = (inverseViewMatrix * vec4(eyeSpace, 1.0)).xyz;
	vec3 shadowVector = vec3(worldCoordinates - lightWorldPosition);
	
	vec3 absVec = abs(shadowVector);
    float localZcomp = max(absVec.x, max(absVec.y, absVec.z));
    float f = lightIntensity;
    float n = near;
    float normZComp = ((f+n) / (f-n) - (2*f*n)/((f-n)*localZcomp)) * 0.5 + 0.5;
    
    
    vec4 lookupResult = texture(lookupMap, shadowVector);
    vec2 coords = shadowOffset + shadowResolution * (lookupResult.zw * 65535 + (0.5 - 0.5*margin + margin * lookupResult.xy));
    
    return shadow(coords, normZComp);
}
