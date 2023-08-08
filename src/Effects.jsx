import { Bloom, DepthOfField, EffectComposer, SSAO, ToneMapping, Vignette } from "@react-three/postprocessing";

export default function Effects() {
    return <EffectComposer>
        <Bloom luminanceSmoothing={0.06} />
        <DepthOfField bokehScale={10} />
        <Vignette darkness={0.4} />
    </EffectComposer>
}
