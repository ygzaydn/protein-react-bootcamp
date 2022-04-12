import React from "react";

import { useThemeContext } from "../../contexts/themeContext";
import { PatikaIcon } from "../../icons";

const ImageGrid = () => {
    const { state } = useThemeContext();
    return (
        <div className="imageGrid">
            <PatikaIcon />
            <h2 className={state === "light" ? "text--light" : "text--dark"}>
                YAZILIM PATİKALARI
            </h2>
            <h4 className={state === "light" ? "text--light" : "text--dark"}>
                Bootcamp'ler teknoloji kariyerine girmek isteyenler için yeni
                bir eğitim modelidir. Ekibini büyütmek isteyen şirketler bir
                bootcamp'lere sponsor olurlar. Teknik beceriler kazanmaya
                başlamış ancak işe girmeye hazır olmayan kişiler bootcamp'lere
                başvururlar. Seçilen adaylar 4-8 haftalık ücretsiz ve yoğun
                eğitime kabul alırlar. Bootcamp'lerde başarılı olan öğrenciler
                sponsor şirkette ya da sektörde başka şirketlere işe
                yerleşirler.
            </h4>
            <div
                className={`imageGrid--smallrect ${
                    state === "light"
                        ? "imageGrid--rectlight"
                        : "imageGrid--rectdark"
                }`}
            ></div>
            <div
                className={`imageGrid--bigrect ${
                    state === "light"
                        ? "imageGrid--rectlight"
                        : "imageGrid--rectdark"
                }`}
            ></div>
        </div>
    );
};

export default ImageGrid;
