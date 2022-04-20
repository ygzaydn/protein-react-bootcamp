import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { getInformationContext } from "../../contexts/informationContext";
import { fetchCharacter } from "../../utils/axiosCalls";

const HeroGrid = () => {
    const { chosen, setChosen, loading, setLoading } = getInformationContext();
    const { id } = useParams();
    const idToUse = id ? id.split(":")[1] : null;
    const { t } = useTranslation();
    console.log(loading);
    return (
        <div className="hero">
            {chosen?.id ? (
                <>
                    <div className="hero__upperDiv">
                        <div
                            className={
                                loading
                                    ? `hero__imageDiv--loading`
                                    : `hero__imageDiv`
                            }
                        >
                            <img
                                src={
                                    !loading
                                        ? `${chosen.thumbnail.path}.${chosen.thumbnail.extension}`
                                        : null
                                }
                                alt={!loading ? chosen.id : null}
                                className="hero__image"
                            />
                        </div>
                        <div style={{ paddingLeft: "20rem" }}>
                            <h2 className="hero__name">{chosen.name}</h2>

                            <h4 className="hero__description">
                                {chosen.description
                                    ? chosen.description
                                    : t("heroPage.nodesc")}
                            </h4>
                        </div>
                    </div>

                    <div className="hero__infoDiv">
                        <div className="hero__additionalDiv">
                            <div className="hero__seriesDiv">
                                <h4>{t("heroPage.series")}</h4>
                                {chosen.series.available ? (
                                    chosen.series.items.map(
                                        (el, ind) =>
                                            ind < 5 && (
                                                <span key={el.name + ind}>
                                                    {el.name}
                                                </span>
                                            )
                                    )
                                ) : (
                                    <h5>{t("heroPage.noseries")}</h5>
                                )}
                            </div>
                            <div className="hero__storiesDiv">
                                <h4>{t("heroPage.stories")}</h4>
                                {chosen.stories.available ? (
                                    chosen.stories.items.map(
                                        (el, ind) =>
                                            ind < 5 && (
                                                <span key={el.name + ind}>
                                                    {el.name}
                                                </span>
                                            )
                                    )
                                ) : (
                                    <h5>{t("heroPage.nostory")}</h5>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default HeroGrid;
