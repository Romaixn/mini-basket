import { DepthOfField, EffectComposer } from "@react-three/postprocessing";

export default function Effects() {
    return <EffectComposer>
        <DepthOfField bokehScale={10} />
    </EffectComposer>
}
