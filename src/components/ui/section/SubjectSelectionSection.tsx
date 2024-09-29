import React from "react";
import PText from "../../text/PText";
import FormLayout from "../../form/FormLayout";
import CheckBox from "../../form/CheckBox";
import PRedText from "../../text/PRedText";
import { ValidationErrors } from "../../../utils/Interfaces";
import { Subject, Package, ALevelProgram } from "../../../utils/Interfaces";

interface SubjectSelectionSectionProps {
  selectedPackage: Package | ALevelProgram | null;
  selectedSubjects: Subject[] | null;
  setSelectedSubjects: React.Dispatch<React.SetStateAction<Subject[] | null>>;
  validationErrors?: ValidationErrors;
  setValidationErrors: React.Dispatch<React.SetStateAction<ValidationErrors>>;
}

const SubjectSelectionSection: React.FC<SubjectSelectionSectionProps> = ({
  selectedPackage,
  validationErrors,
  selectedSubjects,
  setSelectedSubjects,
  setValidationErrors,
}) => {
  const handleChooseSubject = (sub: Subject) => {
    if (selectedPackage) {
      setSelectedSubjects((prevSelectedSubjects) => {
        const isSubjectSelected = prevSelectedSubjects?.some(
          (subject) => subject.id === sub.id
        );
        if (isSubjectSelected && prevSelectedSubjects) {
          if (prevSelectedSubjects.length > selectedPackage.min_select) {
            setValidationErrors((prevErrors) => ({
              ...prevErrors,
              selectedSubjects: "",
            }));
            return prevSelectedSubjects.filter(
              (subject) => subject.id !== sub.id
            );
          } else {
            setValidationErrors((prevErrors) => ({
              ...prevErrors,
              selectedSubjects:
                "Selected subjects must be at least " +
                selectedPackage.min_select,
            }));
          }
          return prevSelectedSubjects;
        } else {
          setValidationErrors((prevErrors) => ({
            ...prevErrors,
            selectedSubjects: "",
          }));
          const newSelectedSubjects = [...(prevSelectedSubjects || []), sub];
          return newSelectedSubjects;
        }
      });
    }
  };

  return (
    <>
      {selectedPackage && (
        <div>
          <PText text="Customize your study programme" required={true} />
          {validationErrors && validationErrors.selectedSubjects && (
            <PRedText text={validationErrors.selectedSubjects} />
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3 pt-1 xs:pt-2">
            {selectedPackage?.package.map((sub) => (
              <FormLayout
                key={sub.id}
                selected={selectedSubjects?.some(
                  (subject) => subject.id === sub.id
                )}
                onClick={() => handleChooseSubject(sub)}>
                <CheckBox
                  checked={selectedSubjects?.some(
                    (subject) => subject.id === sub.id
                  )}
                  label={sub.name}
                />
              </FormLayout>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SubjectSelectionSection;
