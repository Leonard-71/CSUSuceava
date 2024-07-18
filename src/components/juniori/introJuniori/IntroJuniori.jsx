import React from "react";
import "./IntroJuniori.scss";

import intro3 from "../../assets/juniori/intro/antrenor.jpg";

const IntroJuniori = () => {
  const textIntroJuniori = {
    titlu: "Handbal juvenil",
    continut:
      "Mauris sollicitudin tempus purus sit amet sollicitudin. Curabitur ac nulla libero. Proin pretium augue a arcu congue blandit. Maecenas ut risus eleifend nibh vestibulum ultricies. Duis vitae dui lorem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi facilisis mattis metus a fringilla. Mauris laoreet elementum scelerisque. Mauris sollicitudin tempus purus sit amet sollicitudin. Curabitur ac nulla libero. Proin pretium augue a arcu congue blandit. Maecenas ut risus eleifend nibh vestibulum ultricies. Duis vitae dui lorem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi facilisis mattis metus a fringilla. Mauris laoreet elementum scelerisque.",
  };

  return (
    <div>
      <div className="image-container-juniori">
        <div className="imageIntro1-juniori"></div>
      </div>

      <div className="details-container-juniori">
        <div>
          <div className="titleIntro-juniori">
            <h2>{textIntroJuniori.titlu}</h2>
          </div>
          <div className="infoIntro-juniori">
            <p>{textIntroJuniori.continut}</p>
          </div>
        </div>

        <div className="imageIntro-juniori">
          <img src={intro3} alt="" className="imagineIntro-juniori" />
        </div>
      </div>
    </div>
  );
};

export default IntroJuniori;
