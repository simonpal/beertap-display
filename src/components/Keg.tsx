import React, { useMemo, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { BsInfoCircle } from 'react-icons/Bs'
import { calcFromEbc } from '../utils/colorCalc'
import { Wave } from './Wave'

import kegTop from '../assets/keg-top.svg'
import kegBody from '../assets/keg-body-mask.svg'
import kegInner from '../assets/keg-inner.svg'
import kegBottom from '../assets/keg-bottom.svg'
import { Button } from './layout/Button'
import { useRecipe } from '../api'
import { Modal } from './Modal'
import { BeerInfo } from './BeerInfo'
import { Spinner } from './layout/Spinner'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  h3 {
    text-align: center;
    max-width: 94%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`

const waves = keyframes`
0% {
    margin-left: 0;
  }
  100% {
    margin-left: -150px;
  }
`

const StyledKeg = styled.div<ColorBoxProps>`
  font-size: 2rem;
  margin-bottom: 1rem;
  width: 150px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-top: 1rem;
  img {
    max-width: 100%;
  }
  .keg-top {
    margin-bottom: -13px;
    z-index: 11;
  }
  .keg-bottom {
    z-index: 11;
    margin-top: -13px;
  }
`

const KegBody = styled.div`
  position: relative;
  background: #333;
  .keg-inner {
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    opacity: 0.3;
  }
  .keg-body {
    position: relative;
    z-index: 10;
  }
`

const Liquid = styled.div<BeerProps>`
  height: ${({ heightPercentage }) => `calc(${heightPercentage}% - 20px)`};
  transition: height 0.2s ease;
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  .beer-top {
    height: 20px;
    flex-grow: 0;
    align-items: flex-end;
    justify-content: flex-end;
    display: flex;
    position: relative;
    margin-bottom: -1px;
    margin-left: -1px;
    svg path {
      fill: ${({ $ebcColor }) => `#${$ebcColor}`};
    }
    .waves {
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
      animation: ${waves} 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) infinite;
      transform: translate3d(0, 0, 0);
      &:last-of-type {
        transform: translateX(150px);
      }
    }
  }
  .beer-body {
    flex-grow: 1;
    background-color: ${({ $ebcColor }) => `#${$ebcColor}`};
  }
`

// const ColorBox = styled.div<ColorBoxProps>`
//   display: inline-flex;
//   width: 2rem;
//   height: 2rem;
//   background-color: ${({ $ebcColor }) => `#${$ebcColor}`};
// `

interface BeerProps extends ColorBoxProps {
  heightPercentage: number
}
interface ColorBoxProps {
  $ebcColor: string
}
interface KegProps {
  recipeId?: string
  onClick?: () => void
}

// const KEG_BASE = 4.45;

const Keg: React.FC<KegProps> = ({ onClick, recipeId }) => {
  // const [ebcValue, setEbcValue] = useState<number>(10);
  // const [liter, setLiter] = useState<number>(19)
  const liter = 19
  const [showInfo, setShowInfo] = useState<boolean>(false)

  const maxLiter = 19

  // const { data } = useKegWeight();
  const { data: recipe, isLoading } = useRecipe(recipeId ?? '')
  console.log({ recipe })
  const rgb = useMemo(() => calcFromEbc(recipe?.color ?? 10), [recipe])
  // console.log(data);
  const literPercentage = useMemo(() => {
    return Math.round((liter / maxLiter) * 100)
  }, [liter])

  if (isLoading) {
    return <Spinner />
  }
  return (
    <Wrapper>
      <h3>{recipe?.name}</h3>
      <p>{`${recipe?.abv ?? 0}%`}</p>
      <div className="short-info">
        {recipe?.style && <span>{recipe?.style?.name}</span>}
      </div>
      {/* <Label htmlFor="liter">Liter</Label>
      <Input
        type="number"
        id="liter"
        value={liter}
        max="19"
        min="0"
        onChange={(e) => setLiter(Number(e.target.value))}
      />
      <Label htmlFor="ebcvalue">EBC</Label>
      <Input
        type="number"
        min="0"
        id="ebcvalue"
        value={ebcValue}
        onChange={(e) => setEbcValue(Number(e.target.value))}
      /> */}

      {/* <ColorBox $ebcColor={rgb} />
      {rgb} */}

      <StyledKeg $ebcColor={rgb}>
        <img src={kegTop} className="keg-top" alt="keg-top" />
        <KegBody>
          <img src={kegInner} className="keg-inner" alt="keg-inner" />
          <Liquid heightPercentage={literPercentage} $ebcColor={rgb}>
            <div className="beer-top">
              <Wave />
              <Wave />
            </div>
            <div className="beer-body" />
          </Liquid>
          <img src={kegBody} className="keg-body" alt="keg-body" />
        </KegBody>
        <img src={kegBottom} className="keg-bottom" alt="keg-bottom" />
      </StyledKeg>
      <Button
        outlined
        onClick={() => {
          setShowInfo(true)
        }}
      >
        <BsInfoCircle />
        Info
      </Button>
      <Modal
        visible={showInfo}
        onClose={() => {
          setShowInfo(false)
        }}
      >
        {recipe && <BeerInfo recipe={recipe} />}
      </Modal>
    </Wrapper>
  )
}

export default React.memo(Keg)
