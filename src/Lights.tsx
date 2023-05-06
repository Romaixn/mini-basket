export default function Lights() {
    return <>
        <directionalLight
            castShadow
            position={ [ 0, 0, 2 ] }
            intensity={ 1.5 }
        />

        <ambientLight intensity={0.5} />
    </>
}
