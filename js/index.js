window.addEventListener('load', () =>
{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.degree-section');
    const temperatureSpan = document.querySelector('.degree-section span');

    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(position =>
            {
                long= position.coords.longitude;
                lat = position.coords.latitude;

                const proxy = `https://cors-anywhere.herokuapp.com/`;
                const api = `${proxy}https://api.darksky.net/forecast/e2f696cb1ef4280268b40a88017718d4/${lat},${long}`; //este tipo de comillas son necesarias

                 fetch(api)
                    .then(response => {
                        return response.json();
                })   //aca va sin ;

                .then(data => {
                    const {temperature, summary, icon} = data.currently;

                    //seteando los elementos del api en el dom
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    //formula celsius
                    let celsius = (temperature - 32) * (5/9);

                    //setear icon
                    setIcons(icon,document.querySelector('.icon'));

                    //cambiar temperatura a farenheit-celsius
                    temperatureSection.addEventListener('click', () => {
                        if(temperatureSpan.textContent === "F"){
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = celsius.toFixed(2);
                        }
                        else
                        {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    });

                });
            });
    }

    function setIcons(icon, iconID)
    {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});