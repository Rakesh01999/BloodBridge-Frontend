import React from "react";

const Faq = () => {
    return (
        <div>
            <h2 className="text-3xl font-bold text-center text-red-500 mb-8">Frequently Asked Questions</h2>

            <div className="collapse bg-base-200">

                <input type="radio" name="my-accordion-1" defaultChecked />
                <div className="collapse-title text-xl font-medium">
                    What are the main components of blood?
                </div>
                <div className="collapse-content">
                    <p>Red blood cells.White blood cells.Platelets.Plasma</p>
                </div>
            </div>
            <div className="collapse bg-base-200">
                <input type="radio" name="my-accordion-1" />
                <div className="collapse-title text-xl font-medium">
                    What is blood and what are its functions?
                </div>
                <div className="collapse-content">
                    <p>
                        Blood is a fluid that circulates through the heart, arteries,
                        capillaries, and veins, transporting oxygen, nutrients, hormones,
                        and waste products throughout the body. It also helps in immune
                        responses, regulates body temperature, and maintains pH balance.
                    </p>
                </div>
            </div>
            <div className="collapse bg-base-200">
                <input type="radio" name="my-accordion-1" />
                <div className="collapse-title text-xl font-medium">
                    What is the function of red blood cells?
                </div>
                <div className="collapse-content">
                    <p>
                        Red blood cells contain hemoglobin, a protein that binds to oxygen
                        in the lungs and carries it to tissues throughout the body. They
                        also collect carbon dioxide from tissues and transport it back to
                        the lungs for exhalation.
                    </p>
                </div>
            </div>
            <div className="collapse bg-base-200">
                <input type="radio" name="my-accordion-1" />
                <div className="collapse-title text-xl font-medium">
                    What are blood types and why are they important?
                </div>
                <div className="collapse-content">
                    <p>
                        Blood types are determined by the presence or absence of specific
                        antigens on the surface of red blood cells. The main blood types are
                        A, B, AB, and O, with each type being either Rh-positive or
                        Rh-negative. Blood type is important for safe blood transfusions and
                        organ transplants because mismatching blood types can cause a
                        dangerous immune reaction.
                    </p>
                </div>
            </div>
            <div className="collapse bg-base-200">
                <input type="radio" name="my-accordion-1" />
                <div className="collapse-title text-xl font-medium">What is anemia</div>
                <div className="collapse-content">
                    <p>
                        Anemia is a condition in which the blood lacks enough healthy red
                        blood cells or hemoglobin to carry sufficient oxygen to the body's
                        tissues, leading to fatigue, weakness, and other symptoms.
                    </p>
                </div>
            </div>
            <div className="collapse bg-base-200">
                <input type="radio" name="my-accordion-1" />
                <div className="collapse-title text-xl font-medium">
                    Why is it important to donate blood?
                </div>
                <div className="collapse-content">
                    <p>
                        Donating blood helps save lives by providing blood for people who
                        need transfusions due to surgery, accidents, or medical conditions
                        like anemia and cancer. A single donation can save multiple lives
                        because it can be separated into different components like RBCs,
                        plasma, and platelets.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Faq;
