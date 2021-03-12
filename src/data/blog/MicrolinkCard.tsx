// @ts-nocheck

export const MicrolinkCard = () => (
  <>
    <Link
      href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;900&display=block"
      rel="stylesheet"
    />
    <Flex
      sx={{
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexDirection: "column",
        bg: "hsl(205,5%,7%)",
        padding: "40px",
      }}
    >
      <svg
        width={120}
        height={112}
        viewBox="0 0 90 84"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", flexShrink: 0 }}
      >
        <path
          fill="hsl(205,5%,90%)"
          d="M44.695 0C62.777-.01 74.858 3.683 80.94 11.082c5.998 7.296 9.018 17.388 9.06 30.274v.392c.033 13.248-2.987 23.602-9.06 31.062C74.92 80.206 63.018 83.936 45.236 84h-.421l-.603-.001C26.674 83.915 14.93 80.185 8.98 72.81 3.029 65.433.036 55.227 0 42.192v-.396C-.024 28.7 2.97 18.461 8.98 11.082 14.947 3.757 26.74.064 44.363 0L44.695 0zM29.053 15.124l-.172.001c-5.662.04-9.45 2.4-11.368 7.081-.638 1.559-1.17 3.317-1.597 5.275l-.138.66-.072.363-.052.275-.05.277-.066.374-.064.378c-.055.338-.108.68-.157 1.03l-.073.525-.052.4-.05.404-.012.101-.012.102-.046.41-.044.415-.021.21-.02.21-.04.423-.037.428-.01.107-.008.108-.033.434-.032.439-.022.331-.02.334-.026.45-.018.34-.016.342-.02.46-.018.464-.008.234-.014.47-.012.476-.005.24-.004.24-.007.483-.005.489-.001.122v.123l-.002.495v.503l.001.495.002.246.005.488.007.484.01.48.011.474.014.471.008.234.018.464.02.46.016.343.018.34.026.449.02.334.022.332.032.438.033.434.018.216.037.427.04.424.02.21.02.209.045.414.046.41.024.204.05.404.052.4c.047.353.097.701.15 1.045l.08.51.064.378.066.374.05.277.052.275.072.363c.448 2.225 1.026 4.203 1.735 5.935 1.894 4.625 5.617 6.984 11.167 7.079l.373.003.172-.001c5.661-.04 9.45-2.4 11.367-7.081.71-1.734 1.29-3.714 1.737-5.941l.119-.614.068-.374c.117-.658.224-1.337.32-2.036l.092-.705.05-.41.047-.413.056-.524.052-.53.038-.429.037-.434.026-.328.025-.33.03-.445.029-.449.026-.453.012-.228.012-.23.021-.462.02-.466.016-.471.008-.237.007-.239.012-.48.01-.484.007-.488.004-.37.002-.371.002-.5v-.503l-.002-.5-.002-.371-.004-.37-.008-.488-.01-.485-.011-.48-.007-.238-.008-.237-.017-.47-.019-.467-.021-.462-.012-.23-.012-.228-.026-.453-.028-.45-.031-.444-.025-.33-.026-.328-.037-.434-.038-.429-.052-.53-.056-.523-.047-.414-.05-.41-.078-.605-.084-.596-.06-.391c-.48-3.116-1.184-5.808-2.114-8.078-1.936-4.727-5.782-7.088-11.54-7.082zm39.155 43.228h-.036c-1.937.007-3.233.442-3.889 1.304-.66.87-.989 2.075-.986 3.617v.046c.004 1.535.332 2.737.986 3.605.663.88 1.978 1.319 3.948 1.318h.037c1.954-.008 3.261-.447 3.923-1.318.667-.878 1-2.097.996-3.657v-.046c-.005-1.517-.337-2.705-.996-3.565-.668-.87-1.996-1.306-3.983-1.304zm-7.666-43.227l-.373.003c-5.55.094-9.273 2.453-11.167 7.078-1.936 4.728-2.897 11.292-2.88 19.692l.312.03.31.03 1.218.113 1.189.101 1.159.09 1.129.076 1.1.065 1.069.054 1.04.041 1.01.03.98.017.95.006h.232l.231-.002.906-.012.875-.024.846-.036.207-.01.205-.012.801-.054.196-.015.193-.016.757-.071c2.595-.271 4.641-.76 6.14-1.468 3.925-1.854 5.888-6.325 5.888-13.412 0-.818-.066-1.54-.19-2.172-.344-3.64-1.669-6.172-3.974-7.593-2.733-1.686-6.186-2.529-10.36-2.529z"
          fillRule="evenodd"
        />
      </svg>
      <Flex
        sx={{
          marginTop: 4,
          alignItems: "flex-start",
          justifyContent: "flex-start",
          flexDirection: "column",
        }}
      >
        <Text
          sx={{
            fontFamily: "Source Sans Pro",
            fontSize: 5,
            fontWeight: 600,
            color: "hsl(205,5%,65%)",
          }}
        >
          Rude Ayelo
        </Text>
        <Text
          sx={{
            fontFamily: "Source Sans Pro",
            fontSize: 7,
            fontWeight: 900,
            lineHeight: 1,
            color: "hsl(205,5%,90%)",
          }}
        >
          Taming vertical white space with leading-trim and stitches
        </Text>
      </Flex>
    </Flex>
  </>
);
