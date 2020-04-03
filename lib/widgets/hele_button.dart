import 'package:flutter/material.dart';

enum HeleButtonState {
  idle,
  loading,
  success,
  error
}

class HeleButton extends StatelessWidget {
  final HeleButtonState state;
  final Function onClick;
  final String text;
  get colors => {
    HeleButtonState.idle: Colors.lightGreen,
    HeleButtonState.loading: Colors.lightGreen[300],
    HeleButtonState.success: Colors.lightGreen[200],
    //HeleButtonState.error: Colors.red
    HeleButtonState.error: Colors.lightGreen
  };

  HeleButton({
    @required this.onClick,
    @required this.state,
    @required this.text,
  });

  @override
  Widget build(BuildContext context) {
    return new FlatButton(
      child: new LayoutBuilder(
        builder: (BuildContext context, BoxConstraints constraints) {
          return Container(
            width: constraints.maxWidth,
            child: getComponent(),
          );
        }
      ),
      onPressed: onClick,
      shape: RoundedRectangleBorder(
        borderRadius: new BorderRadius.circular(18.0),
      ),
      color: colors[state],
    );
  }

  Widget getComponent() {
    if (state == HeleButtonState.idle || state == HeleButtonState.error) {
      return Text(
        text,
        textAlign: TextAlign.center,
        style: const TextStyle(
          color: Colors.white,
          fontSize: 16.0,
        ),
      );
    } else if (state == HeleButtonState.loading) {
      return CircularProgressIndicator(
        valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
      );
    } else {
      return Icon(Icons.check, color: Colors.white);
    }
  }
}