import { IconButton, Stack, SvgIcon, Typography, styled } from '@mui/material';
import { useContext } from 'react';
import { UseFormSetValue, UseFormTrigger } from 'react-hook-form';
import { StepContext } from '../../../../provider';
import { ValuesForm } from '../../Form';
import { IconRate1, IconRate2, IconRate3, IconRate4, IconRate5 } from './assets';

const customIcons: {
  [index: string]: {
    icon: React.ReactElement;
    label: string;
  };
} = {
  1: {
    icon: <SvgIcon fontSize='inherit'><IconRate1 label='Very Dissatisfied' /></SvgIcon>,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SvgIcon fontSize='inherit'><IconRate2 label='Dissatisfied' /></SvgIcon>,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SvgIcon fontSize='inherit'><IconRate3 label='Neutral' /></SvgIcon>,
    label: 'Neutral',
  },
  4: {
    icon: <SvgIcon fontSize='inherit'><IconRate4 label='Satisfied' /></SvgIcon>,
    label: 'Satisfied',
  },
  5: {
    icon: <SvgIcon fontSize='inherit'><IconRate5 label='Very Satisfied' /></SvgIcon>,
    label: 'Very Satisfied',
  },
}

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  fontSize: "5rem",
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.1)',
    backgroundColor: 'transparent'
  },
  '&:disabled': {
    backgroundColor: theme.palette.primary.main
  },
  [theme.breakpoints.down('lg')]: {
    fontSize: "3rem"
  }
}));

interface Props {
  setValue: UseFormSetValue<ValuesForm>
  trigger: UseFormTrigger<ValuesForm>
  selectedValue?: number
}
export default function Step3({ setValue, trigger, selectedValue }: Props) {
  const { next } = useContext(StepContext)

  function handleClick(value: number) {
    setValue("rating", value)
    trigger("experienceRating").then(e => {
      if (e) next()
    })
  }

  return (
    <>
      <img
        src={`https://media-cdn.tripadvisor.com/media/photo-s/19/8b/bc/14/img-20191009-202243-633.jpg?w=400&fit=crop&auto=format`}
        alt={"Montaditos image"}
        loading="eager"
        width={"100%"}
        style={{ objectFit: "cover", maxHeight: "400px" }}
      />
      <Stack spacing={2}>
        <Typography fontSize={"25px"} fontWeight={700} textAlign={"center"}>Califica como fue tu experiencia gastronómica</Typography>
        <Stack direction={"row"} spacing={2} width={"100%"} justifyContent={"space-evenly"} >
          {
            Object.entries(customIcons).map(([key, value]) => (
              <StyledIconButton
                aria-label={value.label}
                key={key}
                onClick={() => handleClick(Number(key))}
                disabled={selectedValue === Number(key)}
              >
                {value.icon}
              </StyledIconButton>
            ))
          }
        </Stack>
      </Stack>
    </>
  )
}
