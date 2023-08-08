import { DepthOfField, EffectComposer, N8AO, SSAO } from "@react-three/postprocessing";

export default function Effects() {
    return <EffectComposer>
        <N8AO color="#BFC92F" aoRadius={2} intensity={1} />
        <SSAO />
    </EffectComposer>
}
