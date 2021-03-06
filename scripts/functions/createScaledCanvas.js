function createScaledCanvas(xRes, yRes)
{
  let xScaling = windowWidth / xRes;
  let yScaling = windowHeight / yRes;

  scaling = xScaling;
  if (yScaling < xScaling) scaling = yScaling;

  resizeCanvas(xRes * scaling, yRes * scaling);

}
