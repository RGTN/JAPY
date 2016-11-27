#version 150 core

#define CONST_PI 3.141592653589793238
#define CONST_POWER 10.0
#define CONST_RADIUS 2.0
#define CONST_SAMPLING_DIRECTIONS 6
#define CONST_SAMPLING_STEPS 9
#define CONST_TANGENT_BIAS 0.3
#define CONST_RANGE 1.0

uniform sampler2D depthBuffer;
uniform sampler2D normalBuffer;
uniform sampler2D noiseBuffer;

uniform vec2 uScreenDimension;
uniform float inverseAspectRatio;
uniform vec2 minMaxSsaoWidth;

uniform vec2 frustumCorner;
uniform vec2 nearFar;

in vec2 texCoords;
out vec3 fragColor;

vec3 unproject( vec2 tc, float depth ) {
	return vec3( (tc * 2.0 - 1.0) * frustumCorner, -1) * depth;
}

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

vec3 unpackNormal(vec2 packedNormal){
    vec4 nn = vec4(packedNormal * 2.0, 0, 0) + vec4(-1,-1,1,-1);
    float l = dot(nn.xyz,-nn.xyw);
    nn.z = l;
    nn.xy *= sqrt(l);
    return nn.xyz * 2 + vec3(0,0,-1);
}

void main() {
	float depth = texture( depthBuffer, texCoords ).r;
    vec3 viewPos = unproject( texCoords, depth );
	vec3 viewNorm = unpackNormal(texture(normalBuffer, texCoords).xy);

    float total = 0.0;
    float sample_direction_increment = (CONST_PI * 2) / float(CONST_SAMPLING_DIRECTIONS);

	// Calculate noise
	vec2 noiseScale = uScreenDimension/4.0;
	vec2 randVector = normalize( texture( noiseBuffer, texCoords * noiseScale).xy * 2.0 - 1.0);

	float offsetScale = 1 / (depth * nearFar.y);

    for (int i = 0; i < CONST_SAMPLING_DIRECTIONS; i++) {
    	float randomValue = rand(texCoords); // Unused. Noise texture has better results
		float sampling_angle = float(i) * sample_direction_increment;// + randomValue; // azimuth angle theta in the paper
		vec2 sampleDir = vec2(cos(sampling_angle), sin(sampling_angle));

		// Apply noise
		sampleDir = reflect(sampleDir, randVector); // If random rotation is used, comment out this line

		// March along sampleDir (vector)
        float tangentAngle = acos(dot(vec3(sampleDir, 0.0), viewNorm)) - (0.5 * CONST_PI) + CONST_TANGENT_BIAS;
        float horizonAngle = tangentAngle;
		float SAMPLING_STEP = (CONST_RADIUS + ((randVector.x - randVector.y) * 0.5)) / float(CONST_SAMPLING_STEPS);
		//SAMPLING_STEP *= 0.1;

		// Scale by distance from camera
		SAMPLING_STEP *= offsetScale;

		// Force min-max
		SAMPLING_STEP = min(0.02, max( 0.001, SAMPLING_STEP ) );

		// Start occlusion check
		float occlusion = 0.0;
        for (int j = 0; j < CONST_SAMPLING_STEPS; j++) {
            // march along the sampling direction and see what the horizon is
            vec2 sampleOffset = float(j+1) * SAMPLING_STEP * sampleDir;
            sampleOffset.x *= inverseAspectRatio;
            vec2 offTex = texCoords + sampleOffset;

			// reconstruct view-space position for this sample
            vec3 off_viewPos = unproject( offTex.st, texture( depthBuffer, offTex.st ).r );//reconstructPosition( texture( depthBuffer, offTex.st ).r, offTex );

            // Get difference in depths (center to sample)
            vec3 diff = off_viewPos.xyz - viewPos.xyz;

			// find length from centerpoint to current point on scene
			float diffLength = length(diff);

			// Normal Check
			float normalCheck = 1.0 - clamp( dot( tangentAngle, horizonAngle ), 0.0, 1.0 );

			// Range Check
			float rangeCheck = 1.0 - step( float(CONST_RADIUS * CONST_RANGE), diff.z * nearFar.y );

			// find horizon angle
			float x = diff.z / length(diff.xy);
			float elevationAngle = x * inversesqrt(x*x + 1); // ORIGINAL & SLOWER: --> atan(diff.z / length(diff.xy));
			horizonAngle = max(horizonAngle, elevationAngle);

			// Handle attenuation
			float normDiff = diffLength / float(CONST_RADIUS);
			float attenuation = 1 - normDiff*normDiff;

			// Fade out (Temp fix for ( horizon angle / tangent bias ) bug)
			float fade = 1.0 - clamp( depth * 2, 0.0, 1.0);


			// Apply occlusion
			occlusion += clamp(attenuation * (sin(horizonAngle) - sin(tangentAngle)), 0.0, 1.0) * normalCheck * rangeCheck * fade;
        }
		occlusion /= float(CONST_SAMPLING_STEPS);
        total += 1.0 - occlusion;
    }

	// Divide ao by amount of directions to calculate average shading between 0 and 1
    total /= CONST_SAMPLING_DIRECTIONS;

	// Apply SSAO power
    total = pow( clamp( total, 0.0, 1.0), CONST_POWER );

	// Output ssao
    fragColor = vec3( total, total, depth );
    //fragColor = vec3( depth );
}