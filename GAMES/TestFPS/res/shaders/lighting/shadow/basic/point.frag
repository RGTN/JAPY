
//version 150 added by program

uniform sampler2DShadow shadowMap;

float shadow(vec2 coords, float d){
    return texture(shadowMap, vec3(coords, d));
}