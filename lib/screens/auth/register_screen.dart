import 'package:flutter/material.dart';
import 'package:hele/helpers/launch_url.dart';
import 'package:hele/responses/auth/register_response.dart';
import 'package:hele/widgets/hele_button.dart';
import 'package:hele/widgets/hele_link_text.dart';
import 'package:validators/validators.dart';
import 'package:hele/helpers/hele_http_service.dart';

class RegisterScreen extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return new RegisterScreenState();
  }
}

class RegisterScreenState extends State<StatefulWidget> {
  HeleButtonState _registerButtonState = HeleButtonState.idle;
  String _error;
  String _phone;
  String _username;
  String _establishmentCode;
  int _age;
  int _regionId = 2;
  bool _agreeTos = false;
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  @override
  void initState() {
    super.initState();
  }

  void _registerAsync() async {
    setState(() { _registerButtonState = HeleButtonState.loading; _error = null; });
    try {
      RegisterResponse res = await heleHttpService.call<RegisterResponse>('register', body: {
        'phone': this._phone,
        'username': this._username,
        'age': this._age.toString(),
        'region_id': this._regionId.toString(),
        'establishment_code': this._establishmentCode,
      });
      setState(() { _registerButtonState = HeleButtonState.success; _error = null; });
      if (res.password != null) {
        print(res.password);
      }
      Navigator.pushReplacementNamed(context, '/');
    } catch (e) {
      setState(() { _registerButtonState = HeleButtonState.idle; });
      heleHttpService.errorHandler(e, {
        BadRequestException: (BadRequestException e) {
          setState(() { _error = e.errors.join('\n'); });
        }
      });
      print(e.toString());
    }
  }

  Widget _setupLoginLink() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        Text("Vous avez déjà un compte ? "),
        HeleLinkText(
          text: "Connectez-vous",
          onTap: () {
            Navigator.pushReplacementNamed(context, '/login');
          }
        )
      ]
    );
  }

  Widget _setupTosCheckbox() {
    ThemeData theme = Theme.of(context);
    return Container(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        children: <Widget>[
          new CheckboxListTile(
              value: _agreeTos,
              onChanged: (bool value) => setState(() => _agreeTos = value),
              title: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Text("J'accepte les "),
                  HeleLinkText(
                    text: "Conditions Générales",
                    onTap: () {
                      launchURL("https://hele-app.fr/cg-app.html");
                    }
                  )
                ]
              ),
              controlAffinity: ListTileControlAffinity.leading,
          ),
        ]
      )
    );
  }

  Widget _setupRegisterButton() {
    return HeleButton(onClick: () {
      if (_registerButtonState == HeleButtonState.loading) {
        return;
      }
      if (!_agreeTos) {
        setState(() {
          _registerButtonState = HeleButtonState.idle;
          _error = "Vous devez accepter les Conditions Générales.";
        });
        return;
      }
        setState(() {
          _error = null;
        });
      if (_formKey.currentState.validate()) {
        _formKey.currentState.save();
        this._registerAsync();
      }
    }, state: _registerButtonState, text: "S'INSCRIRE");
  }

  Widget _setupErrorMessage() {
    return _error == null ? Container() : new Padding(
      padding: const EdgeInsets.all(16.0),
      child: new Text(
        _error == null ? "" : _error,
        style: const TextStyle(
          color: Colors.red,
          fontSize: 16.0,
        ),
      )
    );
  }

  Widget _setupForm() {
    return Form(
      key: _formKey,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Center(
            child: Image.asset('assets/logo-hele-large.png')
          ),
          SizedBox(height: 48),
          TextFormField(
            onSaved: (value) => this._phone = value,
            keyboardType: TextInputType.phone,
            decoration: InputDecoration(labelText: 'N° de téléphone'),
            validator: (value) {
              if (!matches(value, r'^[0|\+33][6-7][0-9]{8}$')) {
                return 'Entrez un numéro de téléphone mobile valide.';
              }
              return null;
            },
          ),
          TextFormField(
            onSaved: (value) => this._username = value,
            keyboardType: TextInputType.text,
            decoration: InputDecoration(labelText: 'Pseudonyme (public)'),
            validator: (value) {
              if (!matches(value, r'^[a-zA-Z0-9-_]{3,20}$')) {
                return "Entrez un pseudonyme allant de 3 à 20 caractères (sans espace).";
              }
              return null;
            },
          ),
          TextFormField(
            onSaved: (value) => this._establishmentCode = value,
            keyboardType: TextInputType.text,
            decoration: InputDecoration(labelText: 'Code établissement'),
            validator: (value) {
              if (value.isEmpty) {
                return "Veuillez entrer un code d'établissement.";
              }
              return null;
            },
          ),
          TextFormField(
            onSaved: (value) => this._age = int.parse(value),
            keyboardType: TextInputType.number,
            decoration: InputDecoration(labelText: 'Âge'),
            validator: (value) {
              if (value.isEmpty) {
                return "Veuillez entrer votre âge.";
              }
              int v = int.parse(value);
              if (v < 10 || v > 99) {
                return "Entrez votre âge.";
              }
              return null;
            },
          ),
          _setupTosCheckbox(),
          _setupErrorMessage(),
          _setupRegisterButton(),
        ]
      )
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('RegisterScreen'),
      ),
      body:
        Center(
          child: Container(
            height: double.maxFinite,
            margin: EdgeInsets.all(20.0),
            child: new Stack(
              //alignment:new Alignment(x, y)
              children: <Widget>[
                new Positioned(
                  child: _setupForm()
                ),
                new Positioned(
                  child: new Align(
                    alignment: FractionalOffset.bottomCenter,
                    child: Padding(
                      padding: const EdgeInsets.only(bottom: 16.0),
                      child: _setupLoginLink()
                    )
                  ),
                )
              ],
            ),
          )
      )
    );
  }
}
