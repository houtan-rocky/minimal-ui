import { FC } from 'react';

import { styled } from '@mui/material/styles';
import { Step, Stepper, StepLabel, StepIconProps } from '@mui/material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

import { StepIdEnum, StepLabelEnum } from 'src/utils/password-strength.util';

import { useTranslate } from 'src/locales';

// ------------------------types----------------------------------------------

const STEPS: IStep[] = [
  {
    id: StepIdEnum.Weak,
    label: StepLabelEnum.Weak,
  },
  {
    id: StepIdEnum.Medium,
    label: StepLabelEnum.Medium,
  },
  {
    id: StepIdEnum.Strong,
    label: StepLabelEnum.Strong,
  },
];

export type IStep = {
  id: StepIdEnum;
  label: StepLabelEnum;
};

type IProps = {
  activeStep: number;
  setActiveStep: (step: number) => void;
};

// ------------------------component----------------------------------------------

export const PasswordStrengthStepper: FC<IProps> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { activeStep, setActiveStep: _ } = props;
  const { t } = useTranslate();

  return (
    <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
      {STEPS.map((step) => (
        <Step key={step.label}>
          <StepLabel StepIconComponent={QontoStepIcon}>{t(step.label)}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#D05354',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#D05354',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

export const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22, // Ensure this matches your design requirements
    alignItems: 'center',
    ...(ownerState.active && {
      color: '#D05354',
    }),
    '& .QontoStepIcon-completedIcon': {
      color: '#D05354',
      zIndex: 1,
      fontSize: 18, // Adjust if necessary to match the size of other icons
    },
    '& .QontoStepIcon-circle': {
      width: 8, // Adjust if necessary for visual consistency
      height: 8, // Adjust if necessary for visual consistency
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
  })
);

export function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

export const Check = ({ className }: { className: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle cx="12" cy="12" r="4" fill="#D05354" />
  </svg>
);
