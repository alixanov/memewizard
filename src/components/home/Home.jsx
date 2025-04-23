import React from 'react'
import DrawIcon from '@mui/icons-material/Draw';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
const Home = () => {
  return (
    <div>
      {/* эти должны отобража более аккуратноф */}
      <p>Сделат мем</p>
      <p>Сделат GIF файл</p>
      <p>Мем ИИ </p>
      <p>Диаграмма</p>
      <p>Изменит размер</p>
      <p>Демотиватор</p>
      <div className="my__mems">
        <p>Мои творения</p>
        <p>Все</p>
        {/* при нажатия окрыт личный кабинет чтобы там отображат сохраненый мемы шаблоны  изображения ползователя потоки и так дале/ */}
      </div>
      <div className="card__mems">
        {/* здес должно быт картинки то есть мемы */}
      </div>
    </div>
  )
}

export default Home
