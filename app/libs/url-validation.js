export async function urlValidation(url) {
  if (!isValidUrl(url)) {
    return false;
  }

  // const checkAvailable = await checkUrlAvailability(url);
  // if (checkAvailable == false) {
  //   return false;
  // }

  return true;
}

function isValidUrl(string) {
  try {
    new URL(string);
  } catch (err) {
    return false;
  }
  return true;
}

async function checkUrlAvailability(url) {
  try {
    const response = await fetch(url);

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
