import React, { useEffect, useState } from "react";
import MainText from "../../text/MainText";
import PText from "../../text/PText";
import FormLayout from "../../form/FormLayout";
import StandartText from "../../text/StandartText";
import SmallLightText from "../../text/SmallLightText";
import { ALevelProgramm, Programms } from "../../../constants/programm";
import PRedText from "../../text/PRedText";
import {
  Subject,
  Package,
  ALevelProgram,
  ValidationErrors,
} from "../../../utils/Interfaces";
import { useLocation } from "react-router-dom";

interface StudyInformationSectionProps {
  selectedPackage: Package | ALevelProgram | null;
  setSelectedPackage: React.Dispatch<
    React.SetStateAction<Package | ALevelProgram | null>
  >;
  setValidationErrors: React.Dispatch<React.SetStateAction<ValidationErrors>>;
  setSelectedSubjects: React.Dispatch<React.SetStateAction<Subject[] | null>>;
  validationErrors?: ValidationErrors;
}

const StudyInformationSection: React.FC<StudyInformationSectionProps> = ({
  selectedPackage,
  setValidationErrors,
  setSelectedPackage,
  setSelectedSubjects,
  validationErrors,
}) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialStage = Number(queryParams.get("stage")) || null;
  const [stage, setStage] = useState<number | null>(initialStage);

  useEffect(() => {
    if (stage !== null) {
      if (stage <= 3) {
        setSelectedPackage(Programms[stage - 1]);
        setSelectedSubjects(() => {
          const newSubjects = Programms[stage - 1].package
            .slice(0, Programms[stage - 1].selected)
            .map((pkg) => ({
              id: pkg.id,
              name: pkg.name,
              price: pkg.price,
              exist: pkg.exist,
            }));
          return newSubjects;
        });
      }
      if (stage === 4) {
        setSelectedPackage(ALevelProgramm);
        setSelectedSubjects(() => {
          const newSubjects = ALevelProgramm.package
            .slice(0, ALevelProgramm.selected)
            .map((pkg) => ({
              id: pkg.id,
              name: pkg.name,
              price: pkg.price,
              exist: pkg.exist,
            }));
          return newSubjects;
        });
      }
      if (stage > 4) {
        setSelectedPackage(null);
      }
    }
  }, [setSelectedPackage, setSelectedSubjects, stage]);

  const handleProgramm = (programm: Package | ALevelProgram) => {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      selectedPackage: "",
    }));

    setSelectedPackage(programm);
    setSelectedSubjects(() => {
      const newSubjects = programm.package
        .slice(0, programm.selected)
        .map((pkg) => ({
          id: pkg.id,
          name: pkg.name,
          price: pkg.price,
          exist: pkg.exist,
        }));
      return newSubjects;
    });
  };
  return (
    <div>
      <MainText text="1. Study Information" />
      <div className="pt-2 xs:pt-2">
        <PText
          text="Which year group will the student be joining?"
          required={true}
        />
        {validationErrors && validationErrors.selectedPackage && (
          <PRedText text={validationErrors.selectedPackage} />
        )}
      </div>
      <div className="pt-1 xs:pt-3 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {Programms.map((programm, index) => (
          <FormLayout
            key={index}
            onClick={() => handleProgramm(programm)}
            selected={selectedPackage?.name === programm.name}>
            <div className="flex justify-between items-center leading-tight md:grid md:grid-cols-2 xl:flex xl:justify-between xl:items-center">
              <StandartText text={programm.name} />
              <div className="md:flex lg:hidden sm:hidden">
                <SmallLightText
                  selected={selectedPackage?.name === programm.name}
                  text={programm.age}
                />
              </div>
            </div>
          </FormLayout>
        ))}
        <FormLayout
          onClick={() => handleProgramm(ALevelProgramm)}
          selected={selectedPackage?.name === ALevelProgramm.name}>
          <div className="flex justify-between items-center leading-tight md:grid md:grid-cols-2 xl:flex xl:justify-between xl:items-center">
            <StandartText text={ALevelProgramm.name} />
            <div className="md:flex lg:hidden sm:hidden">
              <SmallLightText
                selected={selectedPackage?.name === ALevelProgramm.name}
                text={ALevelProgramm.age}
              />
            </div>
          </div>
        </FormLayout>
      </div>
    </div>
  );
};

export default StudyInformationSection;
