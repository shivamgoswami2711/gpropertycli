export async function sendnotification() {
  const url = `https://fcm.googleapis.com/v1/projects/gproperty-366912/messages:send`;

  const headers = {
    Authorization: `Bearer AAAAu9PFJGg:APA91bGDbSuYvVCXCaWmR3C4-7hYwqkaU4pV6ST2GcFQx_Y26j7gLdegHZh2REsSVp4oW0ExJdKV8OL3C1kST3cAsTxnpZUyXeBD204XYdfOwOKNYZaRmUNKhb3NCyFS4a_VW8MmoovC`,
    'Content-Type': 'application/json',
  };

  const message = {
    message: {
      token:
        'eHBa0KW8SPO9xZfC13n51H:APA91bHkVIW7Jet9xVEkwWUi-kx5ze-sQkOktTjeEmNp9KoZ7M6DQjnAEtYouImU_ypJPfB3yrLEo1JtDEOyNETxCEIH_AHHYemWA4I3cvGZkGC0apcpm8pfxrEB4AZQOuMDyOL7T9nb',
      notification: {
        title: 'sfghfd',
        body: 'sfghfd',
      },
    },
  };

  const options = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(message),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log('Message sent successfully:', data);
  } catch (error) {
    console.error('Error sending message:', error);
  }
}
