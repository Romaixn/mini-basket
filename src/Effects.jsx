import { Bloom, DepthOfField, EffectComposer } from "@react-three/postprocessing";

export default function Effects() {
    return <EffectComposer>
        <Bloom luminanceSmoothing={0.06} />
        <DepthOfField bokehScale={10} />
    </EffectComposer>
}
