const Lights: React.FC = () => {
    return <>
        <directionalLight
            castShadow
            position={ [ 0, 0, 2 ] }
            intensity={ 1.5 }
        />

        <ambientLight />
    </>
}

export default Lights
