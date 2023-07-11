const Lights = () => {
    return <>
        <directionalLight
            castShadow
            position={ [ 0, 1, 2 ] }
            intensity={ 1.5 }
        />

        <ambientLight />
    </>
}

export default Lights
