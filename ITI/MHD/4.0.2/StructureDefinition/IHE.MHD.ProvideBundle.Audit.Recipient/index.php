<?php
function Redirect($url)
{
  header('Location: ' . $url, true, 302);
  exit();
}

$accept = $_SERVER['HTTP_ACCEPT'];
if (strpos($accept, 'application/json+fhir') !== false)
  Redirect('http://profiles.ihe.net/ITI/MHD/4.0.2/StructureDefinition-IHE.MHD.ProvideBundle.Audit.Recipient.json2');
elseif (strpos($accept, 'application/fhir+json') !== false)
  Redirect('http://profiles.ihe.net/ITI/MHD/4.0.2/StructureDefinition-IHE.MHD.ProvideBundle.Audit.Recipient.json1');
elseif (strpos($accept, 'json') !== false)
  Redirect('http://profiles.ihe.net/ITI/MHD/4.0.2/StructureDefinition-IHE.MHD.ProvideBundle.Audit.Recipient.json');
elseif (strpos($accept, 'application/xml+fhir') !== false)
  Redirect('http://profiles.ihe.net/ITI/MHD/4.0.2/StructureDefinition-IHE.MHD.ProvideBundle.Audit.Recipient.xml2');
elseif (strpos($accept, 'application/fhir+xml') !== false)
  Redirect('http://profiles.ihe.net/ITI/MHD/4.0.2/StructureDefinition-IHE.MHD.ProvideBundle.Audit.Recipient.xml1');
elseif (strpos($accept, 'html') !== false)
  Redirect('http://profiles.ihe.net/ITI/MHD/4.0.2/StructureDefinition-IHE.MHD.ProvideBundle.Audit.Recipient.html');
else 
  Redirect('http://profiles.ihe.net/ITI/MHD/4.0.2/StructureDefinition-IHE.MHD.ProvideBundle.Audit.Recipient.xml');
?>
    
You should not be seeing this page. If you do, PHP has failed badly.
