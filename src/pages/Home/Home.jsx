import "./Home.css"
import { Header } from "../../common/Header/Header"

export const Home = () => {
    return (
        <>
            <Header />
            <div className="homeDesign">
                <div className="titleDesign">
                    InkSoul Studio
                </div>
                <div className="contentDesign">
                    <div className="section">
                        <div className="descriptionDesign">
                            Ubicado en el corazón de la ciudad, InkSoul es más que un simple estudio de tatuajes y piercings; es un santuario del arte corporal donde la creatividad se encuentra con la habilidad técnica para transformar ideas en obras maestras duraderas.
                            En InkSoul, nos dedicamos a ofrecer una experiencia única y personalizada para cada cliente. Creemos que cada tatuaje y piercing cuenta una historia, y nuestro objetivo es ayudarte a contar la tuya de la manera más auténtica y artística posible.
                        </div>
                        <img src="../../../img/imgProyect/diseñoTatto4.png" alt="InkSoul Studio" className="descriptionImage" />
                    </div>
                    <div className="section">

                    <img src="../../../img/imgProyect/tattoMaquina.png" alt="InkSoul Studio" className="descriptionImage" />
                        <div className="descriptionDesign">
                            Ofrecemos una amplia gama de servicios, desde tatuajes personalizados y piercings artísticos hasta retoques y coberturas. Además, proporcionamos consultas gratuitas para discutir tus ideas, responder a tus preguntas y asegurarnos de que estés completamente satisfecho con el diseño antes de comenzar el proceso de tatuaje o piercing.
                        </div>
                        
                    </div>
                    <div className="section">
                        <div className="descriptionDesign">
                            Utilizamos solo las mejores tintas, agujas y materiales disponibles en el mercado para garantizar resultados de alta calidad y duraderos. Además, nos mantenemos al día con las últimas tendencias y técnicas en el mundo del tatuaje y el piercing para ofrecerte los mejores servicios posibles.
                        </div>
                        <img src="../../../img/imgProyect/tattoDiseño3.png" alt="InkSoul Studio" className="descriptionImage" />
                    </div>
                </div>
            </div>
        </>
    );
}