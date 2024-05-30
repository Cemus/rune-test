export default function formatDisplayName(displayName: string) {
  const nameParts = displayName.split(" ");
  if (nameParts.length === 1) {
    return displayName;
  }
  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];
  const formattedLastName = lastName.charAt(0).toUpperCase() + ".";
  return `${firstName} ${formattedLastName}`;
}
